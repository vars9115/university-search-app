async function searchUniversities() {

    const name = document.getElementById("universityName").value;
    const country = document.getElementById("country").value;

    const results = document.getElementById("results");
    const message = document.getElementById("message");

    results.innerHTML = "";
    message.textContent = "Searching...";

    try {

        const url =
            `/search?name=${encodeURIComponent(name)}&country=${encodeURIComponent(country)}`;

        const response = await fetch(url);

        const data = await response.json();

        if (data.error) {
            message.textContent = data.error;
            return;
        }

        if (data.length === 0) {
            message.textContent = "No universities found.";
            return;
        }

        message.textContent = `${data.length} universities found.`;

        data.forEach(university => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <h2>${university.name}</h2>

                <p>
                    <strong>Country:</strong>
                    ${university.country}
                </p>

                <p>
                    <strong>Domain:</strong>
                    ${university.domain || "Not available"}
                </p>

                ${
                    university.website
                    ? `<a href="${university.website}" target="_blank">
                         Visit Website
                       </a>`
                    : ""
                }
            `;

            results.appendChild(card);
        });

    } catch (error) {

        message.textContent =
            "Something went wrong. Please try again.";

        console.error(error);
    }
}