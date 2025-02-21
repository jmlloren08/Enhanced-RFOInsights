<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskAssigned extends Notification
{
    use Queueable;

    private $task;
    /**
     * Create a new notification instance.
     */
    public function __construct($task)
    {
        $this->task = $task;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    // public function toMail(object $notifiable): MailMessage
    // {
    //     return (new MailMessage)
    //         ->subject('New Task Assigned')
    //         ->line('You have been assigned a new task: ' . $this->task->title)
    //         ->action('View Task', url('/tasks'))
    //         ->line('Thank you for using our application!');
    // }
    public function toDatabase(object $notifiable): array
    {
        return [
            'message' => 'You have been assigned a new task: ' . $this->task->title,
            'task_id' => $this->task->id,
            'title' => $this->task->title,
            'description' => $this->task->description,
            'assigned_to' => $this->task->user->name,
            'url' => url('/tasks')
        ];
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    // public function toArray(object $notifiable): array
    // {
    //     return [
    //         'task_id' => $this->task->id,
    //         'title' => $this->task->title,
    //         'description' => $this->task->description,
    //         'assigned_to' => $this->task->user->name
    //     ];
    // }
}
