<?php
  // 文件路径
  $file = "counter.txt";

  // 读取计数
  if (file_exists($file)) {
    $count = (int)file_get_contents($file);
  } else {
    $count = 0;
  }

  // 每访问一次就 +1
  $count++;

  // 写回文件
  file_put_contents($file, $count);

  // 输出结果
  echo $count;
?>