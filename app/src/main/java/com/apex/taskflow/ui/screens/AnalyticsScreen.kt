package com.apex.taskflow.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.apex.taskflow.data.model.Priority
import com.apex.taskflow.data.model.TaskItem
import com.apex.taskflow.data.model.TaskStatus
import com.apex.taskflow.ui.theme.CyanAccent
import com.apex.taskflow.ui.theme.EmeraldSuccess
import com.apex.taskflow.ui.theme.IndigoPrimary

@Composable
fun AnalyticsScreen(tasks: List<TaskItem>) {
    val total = tasks.size
    val completed = tasks.count { it.status == TaskStatus.COMPLETED }
    val inProgress = tasks.count { it.status == TaskStatus.IN_PROGRESS }
    val pending = tasks.count { it.status == TaskStatus.TODO }
    val urgentCount = tasks.count { it.priority == Priority.URGENT }
    val totalEstimatedHours = tasks.sumOf { it.estimatedHours }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Text(
            text = "Productivity Analytics",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = "Weekly velocity and task distribution",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Grid of Stats
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            StatCard(
                title = "Completion Rate",
                value = if (total > 0) "${(completed * 100 / total)}%" else "0%",
                color = EmeraldSuccess,
                modifier = Modifier.weight(1f)
            )
            StatCard(
                title = "In Progress",
                value = "$inProgress",
                color = CyanAccent,
                modifier = Modifier.weight(1f)
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            StatCard(
                title = "Urgent Priority",
                value = "$urgentCount",
                color = Color(0xFFEF4444),
                modifier = Modifier.weight(1f)
            )
            StatCard(
                title = "Total Workload",
                value = "${totalEstimatedHours}h",
                color = IndigoPrimary,
                modifier = Modifier.weight(1f)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Task Breakdown Card
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "Status Breakdown",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(16.dp))

                StatusBarRow(label = "Completed", count = completed, total = total, color = EmeraldSuccess)
                Spacer(modifier = Modifier.height(12.dp))
                StatusBarRow(label = "In Progress", count = inProgress, total = total, color = CyanAccent)
                Spacer(modifier = Modifier.height(12.dp))
                StatusBarRow(label = "Pending Backlog", count = pending, total = total, color = Color(0xFFF59E0B))
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

@Composable
fun StatCard(title: String, value: String, color: Color, modifier: Modifier = Modifier) {
    Card(
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = modifier
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(title, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            Spacer(modifier = Modifier.height(6.dp))
            Text(value, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold, color = color)
        }
    }
}

@Composable
fun StatusBarRow(label: String, count: Int, total: Int, color: Color) {
    val fraction = if (total > 0) count.toFloat() / total else 0f
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(label, style = MaterialTheme.typography.bodyMedium)
            Text("$count (${(fraction * 100).toInt()}%)", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold)
        }
        Spacer(modifier = Modifier.height(6.dp))
        LinearProgressIndicator(
            progress = { fraction },
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp)
                .clip(RoundedCornerShape(3.dp)),
            color = color,
            trackColor = MaterialTheme.colorScheme.surface
        )
    }
}
