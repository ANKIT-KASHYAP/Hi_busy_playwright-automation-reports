import { test, expect } from '@playwright/test';
import { getSubscriptionDetails } from './Api_testing/getSubscriptionDetails.js';
import dotenv from 'dotenv';

dotenv.config();

// test('install subscription API automation', async ({ request }) => {

//   const subscription_number = process.env.SUB_NUM || "1165264974";
export async function installSubscription(request, subscription_number) {

  console.log("🚀 Installing SUB:", subscription_number);

  // 1) DB se details
  const details = await getSubscriptionDetails(subscription_number);
  console.log("📌 DB DETAILS:", details);

  // 2) Headers banao (default + dynamic merge)
  const headers = {
    // 🔹 STATIC HEADERS (curl se)
    "ip": "172.16.24.150",
    "SC": "29",
    "VchNo": "application/ogg",
    "TradeDescription": "",
    "Narration": "",
    "PartyInvNo": "0001",
    "PartyInvDate": "27-02-2025",
    "Organisation": "asd",
    "PartyCountry": "",
    "Address1": "A",
    "Address2": "",
    "Address3": "",
    "ContactPerson": "CP",
    "Fax": "",
    "Phone": "",
    "Mobile": "8882520239",
    "ThanksLetterSent": "True",
    "UserPassword": "Q",
    "ComputerName": "DEEPAK",
    "OldEMailID": "",
    "OldPwd": "Q",
    "BusyMajorVer": "21",
    "BusyRelVer": "10.0",
    "IPAddress": "110.235.230.45dd",
    "MachineID": "vivekp7",
    "DeviceBound": "",
    "IPInfo": "110.235.230.45+10.8.124.94",
    "Source": "",
    "SourceDesc": "",
    "CompGST": "",
    "CompPAN": "",
    "CompCIN": "",
    "AccountantName": "",
    "AccountantEmailID": "",
    "AccountantMobileNo": "",
    "CAName": "",
    "CAEmailID": "",
    "CAMobile": "",
    "IndustryType": "0",
    "NatureOfWork": "0",
    "IndustryTypeDesc": "",
    "NatureOfWorkDesc": "",

    // 🔹 DYNAMIC HEADERS (DB + Input se)
    "InstalledByOrg": details.dealer_id,
    "DealerID": details.dealer_id,
    "PartyCityOrg": "delhi",
    "PartyStateOrg": "delhi",
    "DesignationOrg": "delhi",
    "PinCode": "110045",
    "SrNo": subscription_number,
    "EMail": "ankit.kashyap503@mail.busy.in",
    "ActivationKey": details.activation_key,
    "HDDNo": "samarthy724"
  };

  // 3) API CALL (body empty)
  const response = await request.post(process.env.INSTALL_API_URL, {
    headers: headers,
    data: {}   // API isi tarah expect karti hai
  });

  const txt = await response.text();
  console.log("📩 RAW API RESPONSE:", txt);
  if(txt!=="F"){
    console.log("<====subscription installed successfully====>");
  }
  else
    console.log("<====OOPS!!! sub not installed====>");

  expect(response.status()).toBe(200);
  return txt;
}
// });
