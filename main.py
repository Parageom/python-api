from flask import *
import json
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/view")
def view():
    con = sqlite3.connect("Movie.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("select * from Movies")
    rows = cur.fetchall()
    return json.dumps([dict(ix) for ix in rows])

@app.route("/savedetails/", methods=["POST"])
def saveDetails():
    msg = "msg"
    try:
        data = request.get_json(force=True)
        print(data)
        name = data["name"]
        genre = data["genre"]
        releasedate = data["release date"]
        agelimit = data["age limit"]
        runningtime = data["running time"]

        with sqlite3.connect("Movie.db") as con:
            cur = con.cursor()
            cur.execute("INSERT into Employees (name, genre, release date, age limit, running time) values (?,?,?,?,?)",(name, genre, releasedate, agelimit, runningtime))
            con.commit()
            msg = "Movie successfully Added"
    except:
        con.rollback()
        msg = "We can not add the Movie to the list"
    finally:
        return name
        con.close()

@app.route("/deleterecord/", methods=["POST"])
def deleterecord():
    data = request.get_json(force=True)
    id = str(data["id"])
    print(id)
    with sqlite3.connect("Movie.db") as con:
        try:
            cur = con.cursor()
            cur.execute("delete from Movies where id = ?", id)
            msg = "record successfully deleted"
        except:
            msg = "can't be deleted"

@app.route("/updatedetails/", methods=["POST"])
def updaterecord():
    try:
        data = request.get_json(force=True)
        print(data)
        id = data["id"]
        name = data["name"]
        genre = data["genre"]
        releasedate = data["release date"]
        agelimit = data["age limit"]
        runningtime = data["running time"]

        with sqlite3.connect("Movie.db") as con:
            cur = con.cursor()
            cur.execute("UPDATE Employees SET name=?, genre=?, release date=?, age limit=?, running time=? WHERE id=?", (name, genre, releasedate, agelimit, runningtime, id))
            con.commit()
            msg = "Employee successfully Updated"
    except:
        con.rollback()
        msg = "We can not update the Movie to the list"
    finally:
        return msg
        con.close()

if __name__ == "__main__":
    app.run(debug=True)