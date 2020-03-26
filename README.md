# Carpool-World (FYP-S1-10)


<h2>Starting off...</h2>

Install Node.js accordingly

To install react globally :
<pre><code>npm install -g react-native-cli</code></pre>


To install Expo CLI :
<pre><code>npm install -g expo-cli</code></pre>


Go to a designated location in your pc (make sure you have access to the repository):
<pre><code>sudo git clone https://github.com/xshafqx/Carpool-World.git</code></pre>
*input your laptop password


Go to your terminal :
<pre>
  <code>cd Carpool-World/Carpool-World/Carpool-World</code>
  <code>npm start</code>
  <code>w</code>
</pre>


<u>On your preferred editor, open the Carpool folder</u>

To create and push your new branch to github :
<pre>
  <code>git pull origin</code>
  <code>git checkout -b [name_of_your_new_branch]</code>
  <code>git push origin [name_of_your_new_branch]</code>
</pre>


To see all the branches :
<pre><code>git branch -a</code></pre>


To commit changes to remote branch :
<pre>
  <code>git status</code>
  <code>git add [updated_file]</code>
  <code>git checkout -- [updated_file]</code>
  <code>git commit -m "[your_message]"</code>
  <code>git push origin [name_of_your_branch]</code>
</pre>


To switch branch :
<pre><code>git checkout [branch_name]<code></pre>


<b>WHATS DONE</b>:
- connected to firebase
- registration authentication to firebase
- synced database to firebase
- log in
- log out
- able to send data to firebase
- made multiple tabs to act as pages
- able to retrieve data from firebase
- edit profile
- view your profile
- add counts for use later
- live chat store chat, select user to chat with
- view other profiles
- update password
- storing messages of chat


<b>WHATS NOT DONE</b>:
- retrieving chat *shafiq currently doing*
- rate the driver
- rate the rider
- choose your driver
- choose your rider
- cancel confirmed rides
- cancel requests for rides
- cancel offer for rides
- transaction history
- sort by time
- view available rides
- sort by area/time?
- view available passengers
- sort by area/time?
- automatic route planning (fastest)
- report user
- ban user
- schedule weekly pick-ups
- cancel ride
- balance low reminder -> in app messaging, pushed thru firebase (https://console.firebase.google.com/project/carpool-world/notification)
- audit/log
- connect APIs
- Stripe API
- eNETS Open API
- MapQuest Directions API
- MapQuest Traffic API
- design the app (UI/UX)
