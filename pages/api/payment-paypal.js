import handler from "./create-stripe-session"

export default async function handler(req, res) {
    const data = JSON.parse(req.body);
    if (req.method === 'POST') {
        try{
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
}