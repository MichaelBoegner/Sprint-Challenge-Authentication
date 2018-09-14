<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
    - Using "sessions" allows us to store user data that is unique to that user's time, or session, spent interacting with the server. This means we can track them, which then allows developers to do things like credentialing.  

2. What does bcrypt do to help us store passwords in a secure manner.
    - It hashes and salts the passwords.  

3. What does bcrypt do to slow down attackers?
    - Hashing in and of itself is not computationally complicated enough to thwart CPU/GPU processing powers. By salting the hash, bcrypt adds an additional layer of security that approaches practically infinite complexity in the face of current and near future technologies. 

4. What are the three parts of the JSON Web Token?
    - Header: Dictates which hashing algorithm to be used. 
    - Payload: Carries any identifying data the developer may need. 
    - Signature: Hashes the header and payload and adds in the secret key. 
