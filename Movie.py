import sqlite3

con = sqlite3.connect("Movie.db")
print("Database opened successfully")

con.execute(
    "create table Movie (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Genre TEXT NOT NULL, releasedate TEXT NOT NULL, agelimit TEXT NOT NULL, runningtime TEXT NOT NULL)")

print("Table created successfully")

con.close()