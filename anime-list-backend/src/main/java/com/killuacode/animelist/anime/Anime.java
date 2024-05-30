package com.killuacode.animelist.anime;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.Year;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Anime {

    @UuidGenerator
    @Id
    private String id;

    @Column(unique = true, length = 50, nullable = false)
    private String animeTitle;

    @Column(nullable = false)
    private Year releaseYear;

    private String coverImageUrl;

    @Column(nullable = false, precision = 2)
    private Float rating;

    @Column(nullable = false)
    private int episodesNumber;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private AnimeStatus status;

    @Column(nullable = false)

    @Enumerated(value = EnumType.STRING)
    private AnimeGenres genres;

    @Column(nullable = false, length = 400)
    private String synopsis;
}
