const inputMessage = document.querySelector(".input-message")
const form = document.getElementById('form').addEventListener('submit', async function (event) {
	event.preventDefault()
	const recipientName = document.getElementById('recipient-name').value.trim()
	const recipientPhone = document.getElementById('recipient-phone').value.trim()
	const recipientAdress = document.getElementById('recipient-adress').value.trim()

	const apiKey = 'API__KEY'

	const orderDate = {
		modelName: 'Users date',
		calledMethod: 'create',
		methodProperties: {
			Name: recipientName,
			Phone: recipientPhone,
			Address: recipientAdress,
		},
			apiKey: apiKey,
	}
	try {
		const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(orderDate),
		})
		const result = await response.json()
		if (result.success) {
			alert('Замовлення зафіксовано очікуйте відправку!')
		} else {
			alert('Помилка: ' + result.error[0].message)
		}
	} catch (error) {
		console.debug(error)
		alert('Сталася помилка')
	}
	inputMessage.innerHTML = `
				<p>Ім'я: ${recipientName}</p>
				<p>Телефон: ${recipientPhone}</p>
				<p>Адреса: ${recipientAdress}</p>
			`
})

// валидация
const validation = new JustValidate('#form')
validation.addField("#recipient-name", [
    {
        rule: "required",
        errorMessage: "Введіть ім'я",
    },
    {
        rule: "minLength",
        value: 3,
        errorMessage: "Minimum 3 symbols",
    },
]);
validation.addField("#recipient-phone", [
    {
        rule: "required",
        errorMessage: "Введіть номер телефону",
    },
	{
		rule: 'customRegexp',
		value: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
		errorMessage: "Некоректний номер телефону",
	  },
    {
        rule: "minLength",
        value: 3,
        errorMessage: "Minimum 3 symbols",
    },
]);
validation.addField("#recipient-adress", [
    {
        rule: "required",
        errorMessage: "Введіть адрессу місця проживання",
    },
    {
        rule: "minLength",
        value: 4,
        errorMessage: "Minimum 4 symbols",
    },
])