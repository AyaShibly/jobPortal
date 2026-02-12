# PowerShell script to package the entire jobPortal project

# Get the current directory
$projectPath = Get-Location
$projectName = Split-Path -Leaf $projectPath
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$zipFileName = "$projectName`_$timestamp.zip"
$zipPath = Join-Path (Split-Path $projectPath) $zipFileName

# Exclude sensitive files (but include everything else)
$excludePatterns = @(
    ".git",
    ".env"
)

# Create the zip file
Write-Host "Creating zip file: $zipFileName"
Write-Host "Location: $zipPath"

# Use Compress-Archive to zip the project
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# Get all items to compress
$itemsToCompress = Get-ChildItem -Path $projectPath -Force | Where-Object {
    $name = $_.Name
    -not ($excludePatterns -contains $name)
}

# Compress the project
Compress-Archive -Path $itemsToCompress.FullName -DestinationPath $zipPath -Force

Write-Host "Project packaged successfully!"
Write-Host "File: $zipFileName"
$sizeInMB = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host "Size: $sizeInMB MB"
