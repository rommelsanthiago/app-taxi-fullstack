import express from 'express';
import session from 'express-session';
import { AddressInfo } from 'net';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	const allowedOrigins = ["http://localhost:80"];
	const origin: string = req.headers.origin!;
	if (allowedOrigins.includes(origin)) {
		 res.setHeader('Access-Control-Allow-Origin', origin);
	}
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,PATCH,DELETE');
    next();
});

app.use(
	session({
		secret: 'secretcode',
		resave: true,
		saveUninitialized: true,
		cookie: {
			sameSite: 'none',
			secure: true,
			maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
		}
	})
);

const server = app.listen(process.env.PORT || 8080, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in ${address.address}${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    };
});  
