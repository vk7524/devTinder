export const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdmin = token === "xyz";
    if(!isAdmin){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}

export const userAuth = (req, res, next) => {
    const token = "xysz";
    const isUser = token === "xyz";
    if(!isUser){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}