from flask import Flask, request, jsonify, send_from_directory
import mysql.connector
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_folder="../frontend", static_url_path="")


# MySQL connection
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )


# Serve portfolio website
@app.route("/")
def home():
    return send_from_directory("../frontend", "index.html")


# Receive contact form
@app.route("/contact", methods=["POST"])
def contact():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    try:

        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
        INSERT INTO contact_messages
        (name, email, subject, message)
        VALUES (%s, %s, %s, %s)
        """

        values = (name, email, subject, message)

        cursor.execute(query, values)

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Message sent successfully!"
        }), 200

    except Exception as e:
        print("DATABASE ERROR:", e)

        return jsonify({
            "message": "Something went wrong."
        }), 500


if __name__ == "__main__":
    app.run(debug=True)