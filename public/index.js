// after successful login
localStorage.setItem("loggedIn", "true");
localStorage.setItem("role", role); // authority | tech | citizen
loginBtn.onclick = () => modal.style.display = "block";
