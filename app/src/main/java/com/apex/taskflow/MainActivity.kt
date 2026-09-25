package com.apex.taskflow

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.apex.taskflow.data.repository.TaskRepository
import com.apex.taskflow.ui.screens.AnalyticsScreen
import com.apex.taskflow.ui.screens.CreateTaskScreen
import com.apex.taskflow.ui.screens.HomeScreen
import com.apex.taskflow.ui.screens.SettingsScreen
import com.apex.taskflow.ui.theme.ApexTaskFlowTheme

enum class Screen(val title: String, val icon: ImageVector) {
    TASKS("Tasks", Icons.Default.CheckCircle),
    ANALYTICS("Analytics", Icons.Default.BarChart),
    SETTINGS("Settings", Icons.Default.Settings)
}

class MainActivity : ComponentActivity() {
    private val taskRepository = TaskRepository()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val systemDark = isSystemInDarkTheme()
            var darkTheme by remember { mutableStateOf(systemDark) }

            ApexTaskFlowTheme(darkTheme = darkTheme) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    var currentTab by remember { mutableStateOf(Screen.TASKS) }
                    var isCreatingTask by remember { mutableStateOf(false) }

                    val tasks by taskRepository.tasks.collectAsState()

                    // Proper Android Back Navigation handling
                    BackHandler(enabled = isCreatingTask || currentTab != Screen.TASKS) {
                        if (isCreatingTask) {
                            isCreatingTask = false
                        } else if (currentTab != Screen.TASKS) {
                            currentTab = Screen.TASKS
                        }
                    }

                    if (isCreatingTask) {
                        CreateTaskScreen(
                            onNavigateBack = { isCreatingTask = false },
                            onSaveTask = { newTask ->
                                taskRepository.addTask(newTask)
                            }
                        )
                    } else {
                        Scaffold(
                            bottomBar = {
                                NavigationBar {
                                    Screen.values().forEach { screen ->
                                        NavigationBarItem(
                                            icon = { Icon(screen.icon, contentDescription = screen.title) },
                                            label = { Text(screen.title) },
                                            selected = currentTab == screen,
                                            onClick = { currentTab = screen }
                                        )
                                    }
                                }
                            }
                        ) { paddingValues ->
                            Box(modifier = Modifier.padding(paddingValues)) {
                                when (currentTab) {
                                    Screen.TASKS -> HomeScreen(
                                        tasks = tasks,
                                        onToggleStatus = { taskId -> taskRepository.toggleTaskStatus(taskId) },
                                        onDeleteTask = { taskId -> taskRepository.deleteTask(taskId) },
                                        onCreateTaskClick = { isCreatingTask = true }
                                    )
                                    Screen.ANALYTICS -> AnalyticsScreen(tasks = tasks)
                                    Screen.SETTINGS -> SettingsScreen(
                                        darkTheme = darkTheme,
                                        onToggleDarkTheme = { darkTheme = it }
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
