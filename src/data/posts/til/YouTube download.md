---
title: YouTube download CLI
summary: A small utility script for downloading YouTube videos and converting to ogg-vorbis
date: "2024-04-28T00:00:00.000-04:00"
slug: yt-dl-cli
tags:
  - til
---

Just a small script I use for downloading video / audio from YouTube. There's lots of sites out there that claim to download from YouTube, but I like that this method only uses open source projects.

## Prerequisites

### yt-dlp

This is the open source library for downloading content from YouTube. [Download here.](https://github.com/yt-dlp/yt-dlp)

Just make sure the executable is in your path.

### ffmpeg (optional)

Depending on your usecase, you may want ffmpeg available to convert to your desired output format. I frequently want only the audio and in ogg format, so I need this. Follow the [install instructions](https://ffmpeg.org/download.html) for your specific platform.

## Script

This version of the script downloads the video, extracts the audio, and converts to a .ogg file. The link to the video is the first argument. I have this script aliased to `yt-ogg`.

```shell
yt-dlp -x --audio-format vorbis $1
```

Example usage, this will download the classic "Yee" audio:

```shell
yt-ogg https://www.youtube.com/watch?v=q6EoRBvdVPQ

[youtube] Extracting URL: https://www.youtube.com/watch?v=q6EoRBvdVPQ
[youtube] q6EoRBvdVPQ: Downloading webpage
[youtube] q6EoRBvdVPQ: Downloading ios player API JSON
[youtube] q6EoRBvdVPQ: Downloading android player API JSON
[youtube] q6EoRBvdVPQ: Downloading player 1f8742dc
[youtube] q6EoRBvdVPQ: Downloading m3u8 information
[info] q6EoRBvdVPQ: Downloading 1 format(s): 140
[download] Destination: Yee [q6EoRBvdVPQ].m4a
[download] 100% of  144.40KiB in 00:00:00 at 1.38MiB/s
[FixupM4a] Correcting container of "Yee [q6EoRBvdVPQ].m4a"
[ExtractAudio] Destination: Yee [q6EoRBvdVPQ].ogg
Deleting original file Yee [q6EoRBvdVPQ].m4a (pass -k to keep)
```