const API_URL = import.meta.env.DEV
    ? 'http://localhost:3000/api'  // Development
    : '/api'                       // Production

export async function getHealth() {
    const response = await fetch(`${API_URL}/health`)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}
