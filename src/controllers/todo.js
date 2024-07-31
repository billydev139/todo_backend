import Todo from "../models/todo.js";
export const createTodo = async (req, res) => {
  try {
    const { heading } = req.body;
    const id = req.user._id;
    const existingTodo = await Todo.findOne({ heading, id });
    if (existingTodo) {
      return res.status(203).json({ message: "The Task already exists" });
    }
    // Create a new todo
    req.body.userId = id;
    const newTodo = new Todo(req.body);
    await newTodo.save();
    return res.status(200).json({ message: "Task Created Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { heading, description, status },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAllTodo = async (req, res) => {
  try {
    let userId = req.user._id;
    const deletedTodo = await Todo.deleteMany({ userId: userId });
    if (!deletedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "ALL Task  deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    let id = req.user.id;
    let { page, limit } = req.query;
    limit = limit ? parseInt(limit) : 12;
    page = page ? parseInt(page) : 1;

    let todo = await Todo.find({ userId: id })
      .limit(limit)
      .skip((page - 1) * limit);

    let count = await Todo.countDocuments();
    let content = {
      pages: Math.ceil(count / limit),
      total: count,
      allTodo: todo,
    };

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
