package com.apex.taskflow.data.model

import java.util.UUID

enum class Priority {
    LOW, MEDIUM, HIGH, URGENT
}

enum class TaskCategory {
    ENGINEERING, DESIGN, MARKETING, OPERATIONS, PERSONAL
}

enum class TaskStatus {
    TODO, IN_PROGRESS, COMPLETED
}

data class TaskItem(
    val id: String = UUID.randomUUID().toString(),
    val title: String,
    val description: String = "",
    val category: TaskCategory = TaskCategory.ENGINEERING,
    val priority: Priority = Priority.MEDIUM,
    val status: TaskStatus = TaskStatus.TODO,
    val dueDate: String = "Today",
    val estimatedHours: Int = 2,
    val createdAt: Long = System.currentTimeMillis()
)
