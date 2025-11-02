# PearDrive CLI

A command-line interface for managing PearDrive networks - decentralized file sharing and storage.

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)

## Installation

### Method 1: Install via npm (Recommended)

#### Step 1: (Optional) Install Pear Runtime

```bash
npm install -g pear
```

#### Step 2: Install PearDrive CLI

```bash
npm install -g @peardrive/cli
```

#### Step 3: Run the application

> Runs from any directory in the terminal once you've installed globally!

```bash
peardrivecli
```

### Method 2: Clone and run locally

#### Step 1: Install Pear Runtime (if not already installed)

```bash
npm install -g pear
```

#### Step 2: Clone the repository

```bash
git clone https://github.com/peardrive/PearDriveCLI.git
cd PearDriveCLI
```

#### Step 3: Install dependencies

```bash
npm install
```

#### Step 4: Run the application

```bash
npm run start
```

## Usage

### Getting Started

Once the application starts, you'll see an interactive menu with the following options:

- **Create a new PearDrive network** - Start your own decentralized file sharing network
- **Join an existing network** - Connect to a network using a network key
- **List your networks** - View all your PearDrive networks
- **Delete a network** - Remove a network from your local storage (not yet implemented as of 2.0.3)

### Main Features

#### File Management

- Upload files to your PearDrive network
- Download files from network peers
- List local and network files
- Share files with other network participants

#### Network Management

- Generate QR codes for easy network sharing
- Set custom network nicknames
- Toggle archive mode
- View connected peers and their public keys

### Example Workflow

1. Start the CLI with `npm run start` or `pear run .`
2. Create a new network or join an existing one
3. Upload files you want to share
4. Share your network key with others (via QR code or text)
5. Download files shared by other network participants

### Archive Mode (Automatically save all new files on network)

Archive mode transforms your device into a complete archive node for the PearDrive network. When enabled:

- Your device automatically downloads and stores **every file** shared on the network
- Acts as a persistent backup ensuring data availability even when original uploaders go offline
- Helps strengthen network resilience by maintaining complete copies of all shared content
- Requires sufficient storage space as it will download all network content

## Development

### Running in Development Mode

```bash
pear run -d .
```

### Running Tests

```bash
npm test
```

## Troubleshooting

### Common Issues and Solutions

#### "pear: command not found"

- Solution: Install Pear runtime globally with `npm install -g pear`
- Verify installation with `pear --version`

#### "Cannot find module '@peardrive/cli'"

- Solution: Install the CLI globally with `npm install -g @peardrive/cli`
- Or clone the repository and run `npm install` in the project directory

#### Permission errors during global installation

- Solution: Use `sudo npm install -g pear` on macOS/Linux
- Or configure npm to use a different directory: `npm config set prefix ~/.local`

#### Application won't start after installation

- Check that both Pear runtime and PearDrive CLI are installed
- Try running `pear run .` directly in the cloned repository
- Check console for specific error messages

#### Network connection issues

- Ensure your firewall allows the application to access the network
- Check that you're using the correct network key when joining

#### Files not syncing between peers

- File syncing for file changes will not work as intended until PearDriveCore 3.0
- Verify all peers are connected to the same network
- Ensure sufficient peers are online and connected

---

## [Changelog](./CHANGELOG.md)
