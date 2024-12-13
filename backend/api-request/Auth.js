// Kullanıcı kaydı için POST isteği
async function signUp(email, password) {
  const registerUrl = "http://185.95.164.220:3000/api/login";

  const userData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Kayıt işlemi başarısız:", errorData.message);
      return null;
      
    }

    const responseData = await response.json();
    console.log("Kullanıcı kaydı başarılı:", responseData);
    return responseData;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    return null;
  }
}

signUp( "johndoe@example.com", "securePassword123").then((data) => {
  if (data) {
    console.log("Kullanıcı bilgileri:", data);
  }
});
