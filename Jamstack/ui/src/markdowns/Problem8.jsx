import ReactMarkdown from 'react-markdown'

export default function Problem1() {
    return (
        <div className="card-list shadow-sm">
             <div className="text-2xl font-xl">
             Video and playlist
            </div>
        <div>
            <ReactMarkdown>
            Implement the classes Video and Playlist as follows. The class Video should have a name (String), a duration in seconds (int), a constructor with named arguments, and a toString method. The default name should be "Unknown" and the default length should be 0. The class should work as follows.
            </ReactMarkdown>
            <div className="text-gray-400 p-4">

            print(Video(name: "One second clip", duration: 1));
            <p class="break-words"></p>

            print(Video(name: "Hello again!", duration: 84));
            <p class="break-words"></p>

            </div>
            <ReactMarkdown>
            With the code above, the output should be as follows.
            </ReactMarkdown>
            <div>
            One second clip (1 second)
            Hello again! (84 seconds)
            </div>
            <ReactMarkdown>
            The class Playlist should contain a list of videos, provide a default (no argument) constructor, and offer the following methods: (1) void add(Video video) that adds a video to the playlist, (2) bool has(String name) that returns true if the list of videos contains a video with the given name, and (3) int duration() that returns the sum of durations of the videos in the playlist. The class should work as follows.
            </ReactMarkdown>
            <div className="text-gray-400 p-4">

            final playlist = Playlist();
            <p class="break-words"></p>

print(playlist.has("One second clip"));
<p class="break-words"></p>

print(playlist.duration());
<p class="break-words"></p>

playlist.add(Video(name: "One second clip", duration: 1));
<p class="break-words"></p>

playlist.add(Video(name: "Hello again!", duration: 84));
<p class="break-words"></p>

print(playlist.has("One second clip"));
<p class="break-words"></p>

print(playlist.duration());
<p class="break-words"></p>

            </div>
            <ReactMarkdown>
            With the code above, the output should be as follows.
            </ReactMarkdown>
            <div className="text-gray-400 p-4">
            false
<p class="break-words"></p>

            0
<p class="break-words"></p>

            true
<p class="break-words"></p>

            85
            </div>
        </div>
        </div>
    );
}