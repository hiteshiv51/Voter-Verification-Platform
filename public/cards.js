// Example: restrict cards based on role
// (role would normally come from login/session)

const role = localStorage.getItem("role"); // "authority", "tech", "citizen"

if (role === "citizen") {
    document.querySelectorAll(".card a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Access restricted. This section is for authorized officials only.");
        });
    });
}
