#!/usr/bin/env python3


def toggle_steps(current_step_count: int, total_step_count: int) -> int:
    """
    **Description:**
    Uses the modulo % operator to loop through numbers (starting at 0)
    in a set, returning to 0 automatically after toggling through to
    the last step
    """
    return (current_step_count + 1) % total_step_count
