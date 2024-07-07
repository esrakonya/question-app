

const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const fetchQuizData = async (amount) => {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const randomPosts = getRandomPosts(data, amount);


        const processedData = randomPosts.map((item, index) => {

            const allOptions = shuffleArray([
                getRandomOption(data, item.id + 2),
                getRandomOption(data, item.id),
                getRandomOption(data, item.userId),
                getRandomOption(data, item.id + 1)
            ]);

            const correctAnswer = allOptions.indexOf(item.title);

            return {
                question: item.title,
                answers: allOptions,
                correct_answer: String.fromCharCode(65 + correctAnswer)
            };
        });

        return processedData;
    } catch (error) {
        console.error('Error fetching quiz data:', error.message);
        return []
    }
};

// Function to select random posts from the fetched data
const getRandomPosts = (data, amount) => {
    const shuffledPosts = shuffleArray(data);
    return shuffledPosts.slice(0, amount);
};

// Function to get a random option from the fetched data excluding the given id
const getRandomOption = (data, excludeId) => {
    const filteredData = data.filter(item => item.id !== excludeId);
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    return filteredData[randomIndex].title; // Assuming 'title' as the option text
};




