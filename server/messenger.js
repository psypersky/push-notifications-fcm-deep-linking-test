const program = require('commander');
const admin = require('firebase-admin');
const serviceAccount = require('./todos-lane-firebase-adminsdk-qcqke-084fc308c5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://todos-lane.firebaseio.com',
});

program
  .version('0.0.1')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('send-push')
  .description('send push notification to all users')
  .action(() => {
    const registrationToken =
      'f7UIdsjjfUY:APA91bH5Y_kdqYSK2AX9bIeTYNJW-DJ00wbs59foHKj4VrdFGHYW7ffy_2uAbCRoz1JheOF4YvmAF-mDKzuxysc0QRvGtVV2uTVVfV3kvKLfOwPxod-moMSvcsOklbruF4iKosdmqY1O';
    var payload = {
      notification: {
        title: "$GOOG up 1.43% on the day",
        body: "$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day."
      }
    };

    console.log('sending push notification..');
    // Send a message to the device corresponding to the provided
    // registration token.
    admin
      .messaging()
      .sendToDevice(registrationToken, payload)
      .then(function(response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log('Successfully sent message:', response);
      })
      .catch(function(error) {
        console.log('Error sending message:', error);
      });
  });

program.command('*').action(env => {
  console.log('default command', env);
});

program.parse(process.argv);
