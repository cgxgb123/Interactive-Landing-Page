document.getElementById("ctaButton").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.add("hidden");
});

document.getElementById("close-result").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("result-box").classList.add("hidden");
  document.getElementById("api-response").classList.add("hidden");
  document.getElementById("loading-state").classList.add("hidden");
  document.getElementById("prequal-form").classList.remove("hidden");
});

document
  .getElementById("prequal-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const address = document.getElementById("userAddress").value;
    const city = document.getElementById("userCity").value;
    const state = document.getElementById("userState").value;
    const zip = document.getElementById("userZip").value;
    const dob = document.getElementById("userDob").value;
    const ssn = document.getElementById("userSSN").value;

    document.getElementById(
      "result-name"
    ).textContent = `Name: ${fname} ${lname}`;
    document.getElementById(
      "result-address"
    ).textContent = `Address: ${address}, ${city}, ${state} ${zip}`;
    document.getElementById("result-dob").textContent = `DOB: ${dob}`;
    document.getElementById("result-ssn").textContent = `SSN (Last 4): ${ssn}`;

    document.getElementById("prequal-form").classList.add("hidden");
    document.getElementById("loading-state").classList.remove("hidden");

    const payload = {
      first_name: "Steve",
      last_name: "Johnson",
      address: "3557 Lancer Way",
      city: "Carlsbad",
      state: "California",
      zip: "92008",
      ssn: "111111111",
      date_of_birth: "08/15/1980",
    };

    let data;

    try {
      const response = await fetch("http://localhost:3000/api/prequal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      data = await response.json();
      console.log("Soft Pull Result:", data);
    } catch (err) {
      console.error("Fetch error:", err);
      data = { error: "API request failed" };
    }

    document.getElementById("loading-state").classList.add("hidden");

    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("api-response").classList.remove("hidden");

    document.getElementById("api-response").textContent = JSON.stringify(
      data,
      null,
      2
    );

    e.target.reset();
  });
