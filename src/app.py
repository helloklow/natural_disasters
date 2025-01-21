import pickle
import pandas as pd
from flask import Flask, request, render_template

# Load the model
model_file='../models/model.pkl'

with open(model_file, 'rb') as input_file:
    model=pickle.load(input_file)

# Define the flask application
app=Flask(__name__)

# Dictionary to translate numerical predictions into human readable strings
class_dict={
    '0': 'Not diabetic',
    '1': 'Diabetic'
}

@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'POST':
        
        # Get the data from the form
        glucose=float(request.form['glucose'])
        insulin=float(request.form['insulin'])
        bmi=float(request.form['bmi'])
        age=float(request.form['age'])
        
        # Format the data for inference
        data=pd.DataFrame.from_dict({
            'Glucose': [glucose],
            'Insulin': [insulin],
            'BMI': [bmi],
            'Age': [age]
        })

        # Print out the input features to the terminal for troubleshooting
        print(data.head())

        # Do the prediction
        prediction=str(model.predict(data)[0])

        # Convert the predicted value to a human readable string
        pred_class=class_dict[prediction]

    else:

        pred_class=None
    
    return render_template('index.html', prediction=pred_class)