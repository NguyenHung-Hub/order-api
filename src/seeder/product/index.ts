import _Product from "../../models/Product.model";
import lau from "./lau";
import nhau from "./nhau";
import nuong from "./nuong";

const insert = async () => {
    try {
        const saved = await _Product.insertMany(nuong);
        return saved;
    } catch (error) {
        throw new Error(`error:${error}`);
    }
};

export default insert;
