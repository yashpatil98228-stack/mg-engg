package com.sspsit.portal.controller;

import com.sspsit.portal.model.Staff;
import com.sspsit.portal.model.Notification;
import com.sspsit.portal.repository.StaffRepository;
import com.sspsit.portal.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Promote a staff member to a management role (HOD or Class Teacher)
     */
    @PostMapping("/staff/promote")
    public ResponseEntity<?> promoteStaff(@RequestBody Map<String, String> payload) {
        String staffId = payload.get("staffId");
        String role = payload.get("role");
        String year = payload.get("year");

        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff member not found with ID: " + staffId));

        // Update DB action
        staff.setDesignation(role + " (Year " + year + ")");
        staff.setAssignedYear(year);
        staffRepository.save(staff);

        // Congratulations Trigger: Generate notification record
        Notification notification = new Notification();
        notification.setRecipientId(staffId);
        notification.setMessage("Congratulations! 🎊 You have been selected as the " + role + 
                               " for Year " + year + ". Please check your profile for new management tools.");
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);
        notificationRepository.save(notification);

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Staff promoted successfully and notification triggered."
        ));
    }

    /**
     * Broadcast notification to all teachers
     */
    @PostMapping("/broadcast")
    public ResponseEntity<?> broadcast(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        List<Staff> allStaff = staffRepository.findAll();

        allStaff.forEach(staff -> {
            Notification n = new Notification();
            n.setRecipientId(staff.getId());
            n.setMessage(message);
            n.setCreatedAt(LocalDateTime.now());
            notificationRepository.save(n);
        });

        return ResponseEntity.ok(Map.of("status", "broadcast sent"));
    }

    /**
     * Block/Unblock Teacher or Student
     */
    @PostMapping("/portal/block")
    public ResponseEntity<?> toggleUserStatus(@RequestBody Map<String, Object> payload) {
        String userId = (String) payload.get("userId");
        boolean block = (boolean) payload.get("block");
        
        // Logic to update status in the respective database table
        return ResponseEntity.ok(Map.of("userId", userId, "status", block ? "Blocked" : "Active"));
    }
}
