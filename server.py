from flask import Flask
from flask import request
import spacy
import pandas as pd
from flask_cors import CORS, cross_origin
# app = Flask(__name__)

app = Flask(__name__, static_folder='./client/named-entity-recognition/build', static_url_path='/')
CORS(app)

@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')
    # return "asdfasd"


@app.route('/data', methods=['POST'])
@cross_origin()
def hello_world():
    if request.method == 'POST':
        print("post received")
        # pd.read_json(request.get_data().decode("utf-8"))
        print(request.get_json()['text'])
        textreceived = request.get_json()['text']
        # print(pd.read_json(request.get_json()),orient='records')
        # pd.DataFrame.from_dict(request.get_json(), index=[0])
        nlp = spacy.load('en_core_web_sm')
        doc = nlp(textreceived)
        df = pd.DataFrame(columns=['type','count'])

        for ent in doc.ents:
            df = df.append({'type':ent.label_,'count':1},ignore_index=True)

        total = len(df)

        df = df.groupby(['type']).count()

        df['perc_of_total'] = df['count']*100/total

        print(df.to_json())

        return df.to_json()
    else:
        return 'Please post data'

if __name__ == '__main__':
    app.run()