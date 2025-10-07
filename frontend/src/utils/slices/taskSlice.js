import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

// Fetch all tasks with categories
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/tasks');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
  'tasks/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await API.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, ...taskData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/tasks/${id}`, taskData);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    categories: [],
    loading: false,
    error: null,
    selectedCategory: 'all'
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      });
  },
});

export const { clearError, setSelectedCategory } = taskSlice.actions;
export default taskSlice.reducer;