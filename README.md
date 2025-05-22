# PearDrive Server CLI Alpha

## TODOs

- TODO: Add graceful teardown
- TODO: Fix delete pearDrive command
- TODO: Add delete pearDrive menu
- TODO: Move PearDrive instance CRUD into globalState class
- TODO: Move pearDrives in globalState to private attribute and add interface
  functions

---

## Changelog

### 0.0.1

- Initial release

### 0.0.2

- Back to main menu command
- Fix create bug
- Add universal controls
- Refactor / clean utils
- Add linting
- Update project structure
- Implement global state singleton pattern
- Implement I/O handlers as module
- Fix exit command
- Error handling for directories/files not existing
- CLI req/res prompt error handling
- PearDrive instance error handling to prevent crashes
- Global error handling hook

### 0.1.0

- TODO: Add options menu for each PearDrive instance
  - Add network key to QR code scan feature
  - TODO: Download file
  - Activate/deactivate relay mode
  - TODO: Delete peardrive
  - TODO: View all files (red = nonlocal, yellow = network and local,
    green = remote, blue = downloading)
  - Set network nickname
