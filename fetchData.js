const {fetch} =require('node-fetch')

(async () => {
    try {
        const response = await fetch('https://api.example.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'my new post',
                content: 'this is my content',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
})();
