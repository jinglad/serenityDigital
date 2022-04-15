import {BASE_URL} from "@env";

export const setPaymentSuccess = async (access_token, navigation) => {
  const response = await fetch(`${BASE_URL}/api/category/v1/native-after-payment/`, {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${access_token}`,
    }
  })

  const res = await response.json();

  if(response.ok) {
    navigation.navigate('CategoryTab');
  }
}