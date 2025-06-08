<?php
// Get HTTP error code from server variable
$code = $_SERVER['REDIRECT_STATUS'] ?? 500;

// List of common HTTP error codes and messages
$messages = [
    400 => 'Bad Request',
    401 => 'Unauthorized',
    402 => 'Payment Required',
    403 => 'Forbidden',
    404 => 'Page Not Found',
    405 => 'Method Not Allowed',
    406 => 'Not Acceptable',
    407 => 'Proxy Authentication Required',
    408 => 'Request Timeout',
    409 => 'Conflict',
    410 => 'Gone',
    411 => 'Length Required',
    412 => 'Precondition Failed',
    413 => 'Payload Too Large',
    414 => 'URI Too Long',
    415 => 'Unsupported Media Type',
    416 => 'Range Not Satisfiable',
    417 => 'Expectation Failed',
    418 => "I'm a teapot",
    421 => 'Misdirected Request',
    422 => 'Unprocessable Entity',
    423 => 'Locked',
    424 => 'Failed Dependency',
    425 => 'Too Early',
    426 => 'Upgrade Required',
    428 => 'Precondition Required',
    429 => 'Too Many Requests',
    431 => 'Request Header Fields Too Large',
    451 => 'Unavailable For Legal Reasons',
    500 => 'Internal Server Error',
    501 => 'Not Implemented',
    502 => 'Bad Gateway',
    503 => 'Service Unavailable',
    504 => 'Gateway Timeout',
    505 => 'HTTP Version Not Supported',
    506 => 'Variant Also Negotiates',
    507 => 'Insufficient Storage',
    508 => 'Loop Detected',
    510 => 'Not Extended',
    511 => 'Network Authentication Required',
];

// Default message if code unknown
$message = $messages[$code] ?? 'An unexpected error occurred';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Error <?php echo htmlspecialchars($code); ?> - Brains Brawn & Bong</title>
<link rel="stylesheet" href="/styles.css" />
<style>
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #1a202c;
    color: white;
    font-family: "MAKISUPA", serif;
    margin: 0;
    padding: 2rem;
    text-align: center;
  }
  .error-code {
    font-size: 6rem;
    color: #10B981;
    margin-bottom: 1rem;
  }
  .error-message {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  a.button {
    background-color: #4caf50;
    color: white;
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    border-radius: 0.25rem;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  a.button:hover {
    background-color: #388e3c;
  }
  p.report {
    margin-top: 2rem;
    font-size: 1rem;
  }
  p.report a {
    color: #4caf50;
    text-decoration: none;
  }
  p.report a:hover {
    text-decoration: underline;
  }
</style>
</head>
<body>
  <div class="error-code"><?php echo htmlspecialchars($code); ?></div>
  <div class="error-message"><?php echo htmlspecialchars($message); ?></div>

  <?php if ($code == 404): ?>
    <a href="/shop" class="button">Back to Shop</a>
  <?php else: ?>
    <p class="report">If this issue persists, please <a href="mailto:support@brainsbrawnandbong.shop">contact support</a>.</p>
  <?php endif; ?>
</body>
</html>
