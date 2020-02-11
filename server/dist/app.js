"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
const port = process.env.PORT || 3001;
dotenv_1.default.config();
app.use(cors_1.default());
app.use(express_1.default.json());
const uri = process.env.ATLAS_URI;
mongoose_1.default.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("\nMongoDB database connection established successfully");
});
app.get('/', (req, res) => () => {
    console.log('HW');
});
app.listen(port, () => {
    console.log(`\nListening on port ${port}!`);
});
//# sourceMappingURL=app.js.map