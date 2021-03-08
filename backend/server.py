from flask import Flask, request, session, jsonify
from flask_cors import CORS
import pymysql
import json
import datetime as dt

conn = pymysql.connect( 
        host='localhost', 
        user='root',  
        password = "password", 
        db='office_database', 
        ) 
cur = conn.cursor()
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
customer_session_details = None
app.secret_key = "secretKey"

@app.route('/api/home')
def say_hello_world():
	try:
		cur.execute("select * from stock")
		output = cur.fetchall()
		print(output)
		return {'result': str(output)}
	except :
		print("Caused an exception!")
	return {'result':"sorry!"}

@app.route('/api/brands')
def getBrands():
    cur.execute("select brand_id, brand_name from tyre_brand")
    result = cur.fetchall()
    list_ = [{'value': i[0], 'label': i[1][0].upper()+i[1][1:]} for i in result]
    # print(list_)
    return jsonify(list_)

@app.route('/api/customer', methods=['GET', 'POST'])
def customerRequest():
	global customer_session_details
	if request.method == 'POST':
		# print(request.form)
		data = request.form
		customer_session_details = data
		if customer_session_details.get('date') is None:
			customer_session_details['date'] = dt.datetime.now()
		name = data.get('customerName')
		phone = data.get('customerPhone')
		mail = data.get('customerEmail')
		try:
			cur.execute("""
							insert into
							customers (name, phone_number, email_id)
							values (\'{}\', \'{}\', \'{}\');
						""".format(name, phone, mail))
			conn.commit()
			cur.execute("""
							select customer_id from customers
							where name = \'{}\'
							and phone_number = \'{}\'
							and email_id = \'{}\';
						""".format(name, phone, mail))
			result = cur.fetchall()
			customer_id = result[0][0]
			session['customer_id'] = customer_id
			return registerVehicle()
		except Exception as e:
			print(e)
			return {'result': "Bad response"}

def registerVehicle():
	if customer_session_details.get('vehicleNumber') is not None:
		try:
			cur.execute("""
							insert ignore into vehicles
							set vehicle_number = \'{}\',
							car_model_name = \'{}\',
							customer_id = {},
							last_visit = \'{}\';
						""".format(customer_session_details.get('vehicleNumber'), \
								customer_session_details.get('vehicleModel'), \
									customer_session_details.get('date'), \
										session.get('customer_id')))
			conn.commit()
		except Exception as e:
			print(e)
			return {'result': "Bad response at vehicle"}
		return {'result': 'success'}
	return {'result': 'fail', 'message': 'no vehicle number'}

@app.route('/api/paymentPage', methods=['GET', 'POST'])
def registerPayment():
    if request.method == 'POST':
        try:
            data = request.form
            vehicle_id = customer_session_details.get('vehicleNumber')
            customer_id = session.get('customer_id')
            services = customer_session_details.get('services')
            isTyreSale = True if services%2 != 0 else False
            payment_type = data.get('paymentMode')
            isPaymentDone = data.get('isPaymentDone')
            paymentId = data.get('paymentId')
            date = customer_session_details.get('date')
            totalAmount = data.get('totalAmount')
            cur.execute("""
                            insert into transactions 
                                (transaction_date, 
                                customer_id, vehicle_id, 
                                service_type, is_tyre_sale, 
                                amount, payment_type, 
                                is_payment_done, payment_id)
                            values (\'{}\', {}, \'{}\', {}, {}, {}, {}, {}, \'{}\');
                        """.format(date, customer_id, vehicle_id, services, isTyreSale, \
                            totalAmount, payment_type, isPaymentDone, paymentId))
            conn.commit()
            cur.execute("select LAST_INSERT_ID();")
            transaction_id = cur.fetchall()[0][0]
            if isTyreSale:
                tyreSize = data.get('tyreSize')
                quantity = data.get('tyreQuantity')
                eachTyrePrice = data.get('priceEachTyre')
                amount = quantity*eachTyrePrice
                tyreBrand = data.get('tyreBrand')
                cur.execute("select brand_id from tyre_brand where tyre_brand.brand_name = \'{}\'".format(tyreBrand))
                res = cur.fetchall()
                print(res)
                cur.execute("""
                                insert ignore into stock (tyre_size, brand_id, quantity)
                                select \'{}\' as tyre_size, {}, ifnull(max(quantity), 0)
                                from stock
                                where stock.brand_id = {}
                                and tyre_size = \'{}\'
                            """.format(tyreSize, res[0][0], res[0][0], tyreSize))
                conn.commit()
                cur.execute("select tyre_id from stock, tyre_brand where tyre_size=\'{}\' \
								and stock.brand_id = tyre_brand.brand_id \
									and brand_name = \'{}\'".format(tyreSize, tyreBrand))
                tyre_id = cur.fetchall()[0][0]
                cur.execute("""
                                insert into tyres_transactions (transaction_id, tyre_id, num_tyres, amount)
                                values ({}, \'{}\', {}, {})
                            """.format(transaction_id, tyre_id, quantity, amount))
                return {'result': 'success'}
        except:
            pass
        return {'result': 'failed'}

@app.route('/api/test', methods=['POST'])
def autoIncrementTest():
    data = request.form
    tyreSize = data.get('tyreSize')
    tyreBrand = data.get('tyreBrand')
    cur.execute("select brand_id from tyre_brand where tyre_brand.brand_name = \'{}\'".format(tyreBrand))
    res = cur.fetchall()
    print(res)
    cur.execute("""
                    insert ignore into stock (tyre_size, brand_id, quantity)
                    select \'{}\' as tyre_size, {}, ifnull(max(quantity), 0)
                    from stock
                    where stock.brand_id = {}
                    and tyre_size = \'{}\'
                """.format(tyreSize, res[0][0], res[0][0], tyreSize))
    conn.commit()
    cur.execute("""
                    select *
                    from stock, tyre_brand
                    where tyre_brand.brand_id = stock.brand_id
                    and tyre_size = \'{}\'
                    and tyre_brand.brand_name = \'{}\' 
                """.format(tyreSize, tyreBrand))
    res = cur.fetchall()
    return {'result': str(res)}

if __name__ == "__main__":
	app.run(host="localhost", port=5002, debug=True)
