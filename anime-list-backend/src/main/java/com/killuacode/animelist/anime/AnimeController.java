package com.killuacode.animelist.anime;


import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/anime")
@CrossOrigin(origins = "http://localhost:5173")
public class AnimeController {

    private final AnimeService animeService;

    @GetMapping
    public ResponseEntity<Page<Anime>> retrieveAnimeList(
            @RequestParam int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return animeService.retrieveAnimeList(page, pageSize);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Anime> retrieveAnime(@PathVariable String id) {
        return animeService.retrieveAnime(id);
    }


    @PostMapping
    public ResponseEntity<Anime> createAnime(@RequestBody Anime anime) {
        return animeService.createAnime(anime);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Anime> updateAnime(
            @PathVariable String id,
            @RequestBody Anime anime
    ) {
        return animeService.updateAnime(id, anime);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnime(@PathVariable String id) {
        return animeService.deleteAnime(id);
    }

    @PutMapping(value = "/{id}/upload-image", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadImage(
            @PathVariable String id,
            @RequestParam MultipartFile image
    ) throws IOException {
        return animeService.uploadImage(id, image);
    }


    @GetMapping("/image/{id}")
    public ResponseEntity<Resource> getImage(@PathVariable String id) {
        return animeService.getImage(id);
    }


}
