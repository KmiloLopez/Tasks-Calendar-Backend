export const validateSchema = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);//si todo esta bien con el schema siga con next()
      next();
    } catch (error) {
      return res
        .status(400)
        .json({messagerrr: error.message})
        //.json(error.errors.map((error) => error.message)  );
        //para mostrar unicamente el error especifico en pantalla
    }
  };