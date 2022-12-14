import { Twilio } from "twilio";

interface ClientWithCredentials extends Twilio {
  username: string;
  password: string;
}

let twilioClient: ClientWithCredentials;

export const getTwilioClient = () => {
    if (twilioClient) {
        return twilioClient;
    }

    const client = new Twilio(process.env.ACCOUNT_SID!, process.env.AUTH_TOKEN!);
    twilioClient = client as ClientWithCredentials;
    return twilioClient;
};
