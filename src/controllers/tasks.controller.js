import Task from "../models/task.model.js";

//req.user.id usuario que realizó la solicitud 
//populate() se utiliza para poblar (llenar) los campos de referencia (como "user" en este caso) con los datos reales en lugar de solo sus IDs.

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user : req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTasksByDate = async (req, res) => {
  try {
    const allTasks = await Task.find({ user : req.user.id }).populate("user");
  
    const dateProvided = new Date(req.params.id);// Suponiendo que la fecha viene como un string en formato 'YYYY-MM-DD'0
    
    const dateTasks = allTasks.filter(task => {
      // .date es como se almaceno en mongoDB
      console.log("taks.date", task.date)
      const fechaTarea = new Date(task.date); // Ajusta esto según cómo estén almacenadas tus fechas en las tareas
      console.log("fechaTare",fechaTarea);
      return fechaTarea.toDateString() === dateProvided.toDateString(); // Comparamos solo las fechas (ignorando la hora)
    });

    if (!dateTasks) return res.status(404).json({ message: "No tasks on this day yet" });
    return res.json(dateTasks);
  } catch (error) {// si esto no se hace y hay una peticion que causa un error, se cae el servidor y hay que reiniciarlo
    return res.status(500).json({ message: error.message });
  }

};

export const createTask = async (req, res) => {
  try {
    const { title, description, date, priority, time, timeout, status } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      time,
      timeout,
      priority,
      status,
      user: req.user.id,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ 
      data: "error en tasks.controller.js",
      messager: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, date, status } = req.body;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date, status },
      { new: true }//es para que muestre al final el valor nuevo y no el viejo
    );
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {// si esto no se hace y hay una peticion que causa un error, se cae el servidor y hay que reiniciarlo
    return res.status(500).json({ message: error.message });
  }
};