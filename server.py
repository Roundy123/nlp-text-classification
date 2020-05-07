from flask import Flask
from flask import request
import spacy
import pandas as pd
# app = Flask(__name__)

app = Flask(__name__, static_folder='./client/named-entity-recognition/build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')
    # return "asdfasd"


@app.route('/data', methods=['POST'])
def hello_world():
    if request.method == 'POST':
        nlp = spacy.load('en_core_web_sm')
        doc = nlp(request.get_data().decode("utf-8"))
        df = pd.DataFrame(columns=['type','count'])

        for ent in doc.ents:
            df = df.append({'type':ent.label_,'count':1},ignore_index=True)

        total = len(df)

        df = df.groupby(['type']).count()

        df['perc_of_total'] = df['count']*100/total

        return df.to_json()
    else:
        return 'Please post data'

if __name__ == '__main__':
    app.run()