<h1 text-align="center">CITS3200 Project</h1>
<p text-align="center">Curriculum Mapper!</p> 

1. Make sure pip is installed: 
 <br> &nbsp;&nbsp;  <code> MacOS & Linux: $ python3 -m pip install --user --upgrade pip </code>  
 <br> &nbsp;&nbsp;  <code> Microsoft: $ py -m pip install --upgrade pip </code> <br><br>
 
2. Make sure virtualenv is installed:
 <br> &nbsp;&nbsp;  <code> MacOS & Linux: $ python3 -m pip install --user virtualenv </code>  
 <br> &nbsp;&nbsp;  <code> Microsoft: $ py -m pip install --user virtualenv </code> <br><br>
 
3. Create a virtual environment:
 <br> &nbsp;&nbsp;  <code> MacOS & Linux: $ python3 -m venv venv </code>  
 <br> &nbsp;&nbsp;  <code> Microsoft: $ py -m venv venv </code> <br><br>
 
4. Activate your virtual environment: 
 <br> &nbsp;&nbsp;  <code> MacOS & Linux: $ source venv/bin/activate </code>  
 <br> &nbsp;&nbsp;  <code> Microsoft: $ venv\Scripts\activate </code> <br><br>

5. Run Flask:
 <br> &nbsp;&nbsp;  <code>$ export FLASK_APP=curriculum_mapper.py</code>

6. Run our website through Flask: 
<br> &nbsp;&nbsp; <code> $ flask run </code> <br>

7. Deactivate the virtual environment when finished
 <br> &nbsp;&nbsp; <code> $ deactivate </code> 
 
<h2>Deployment</h2>
Via localhost at port 5000, i.e. the following line should be showing on your terminal: </pre> <pre class=tab > * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit) </pre> 
To run our website, you must open "http://127.0.0.1:5000/" on a browser tab.
