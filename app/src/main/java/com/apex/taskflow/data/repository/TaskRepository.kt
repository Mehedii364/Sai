package com.apex.taskflow.data.repository

import com.apex.taskflow.data.model.Priority
import com.apex.taskflow.data.model.TaskCategory
import com.apex.taskflow.data.model.TaskItem
import com.apex.taskflow.data.model.TaskStatus
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class TaskRepository {
    private val _tasks = MutableStateFlow<List<TaskItem>>(
        listOf(
            TaskItem(
                id = "1",
                title = "Configure Automated Gradle Pipeline",
                description = "Set up GitHub Actions to compile assembleDebug APK and bundleRelease AAB with artifact uploads",
                category = TaskCategory.ENGINEERING,
                priority = Priority.URGENT,
                status = TaskStatus.COMPLETED,
                dueDate = "Today",
                estimatedHours = 3
            ),
            TaskItem(
                id = "2",
                title = "Implement Material 3 Jetpack Compose UI",
                description = "Design responsive home dashboard, category chips, animated state changes, and dark mode support",
                category = TaskCategory.DESIGN,
                priority = Priority.HIGH,
                status = TaskStatus.IN_PROGRESS,
                dueDate = "Tomorrow",
                estimatedHours = 5
            ),
            TaskItem(
                id = "3",
                title = "Release Signing Keystore Security Audit",
                description = "Verify GitHub Secrets isolation for JKS passwords, alias keys, and production builds",
                category = TaskCategory.OPERATIONS,
                priority = Priority.HIGH,
                status = TaskStatus.TODO,
                dueDate = "Oct 2",
                estimatedHours = 2
            ),
            TaskItem(
                id = "4",
                title = "App Bundle AAB Store Distribution",
                description = "Prepare Google Play Console internal testing track submission parameters",
                category = TaskCategory.MARKETING,
                priority = Priority.MEDIUM,
                status = TaskStatus.TODO,
                dueDate = "Oct 5",
                estimatedHours = 4
            )
        )
    )

    val tasks: StateFlow<List<TaskItem>> = _tasks.asStateFlow()

    fun addTask(task: TaskItem) {
        _tasks.value = listOf(task) + _tasks.value
    }

    fun toggleTaskStatus(taskId: String) {
        _tasks.value = _tasks.value.map { task ->
            if (task.id == taskId) {
                val newStatus = when (task.status) {
                    TaskStatus.TODO -> TaskStatus.IN_PROGRESS
                    TaskStatus.IN_PROGRESS -> TaskStatus.COMPLETED
                    TaskStatus.COMPLETED -> TaskStatus.TODO
                }
                task.copy(status = newStatus)
            } else {
                task
            }
        }
    }

    fun deleteTask(taskId: String) {
        _tasks.value = _tasks.value.filter { it.id != taskId }
    }
}
