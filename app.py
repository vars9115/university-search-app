from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

API_URL = "http://universities.hipolabs.com/search"

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search")
def search():
    name = request.args.get("name", "")
    country = request.args.get("country", "")

    params = {}

    if name:
        params["name"] = name

    if country:
        params["country"] = country

    try:
        response = requests.get(API_URL, params=params, timeout=10)
        response.raise_for_status()

        universities = response.json()

        results = []

        for university in universities[:30]:
            results.append({
                "name": university.get("name", "Unknown"),
                "country": university.get("country", "Unknown"),
                "website": university.get("web_pages", [""])[0],
                "domain": university.get("domains", [""])[0]
            })

        return jsonify(results)

    except requests.RequestException:
        return jsonify({
            "error": "Unable to connect to university service."
        }), 500


if __name__ == "__main__":
    app.run(debug=True)