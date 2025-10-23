# 🚧 PearDrive CLI Changelog

- Make compatible for npm module deployment

## 2.0.3

- Update to Core 2.0.3

## 2.0.2

- Update dependencies
- Core 2.0.3: fix buildIndex bug

## 2.0.1

- Update core 2.0.2

## 1.2.0

- Update dependencies
- Dynamic saving of peardrive save data for download queue consistency
- Print out peer public keys when listing all or selected PearDrives

## 1.1.1

- red relay indicator -> grey relay indicator
- @hopets/pear-core -> @peardrive/core
- Fix hyperblob downloads through a peardrive core update

## 1.1.0

- Prettify console printing
- Add deleting network drives
- Add prompting after each response is finished
- Fix relay mode toggling

## 1.0.1

- Update dependencies
- Fix bug causing error when listing network files when one file is held by multiple peers

## 1.0.0

- Get working with new PearDriveCore

## 0.0.1

- Initial release

## 0.0.2

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

## 0.1.0

- Add options menu for each PearDrive instance
  - Add network key to QR code scan feature
  - Download file
  - Activate/deactivate relay mode
  - Set network nickname
  - Add back command
