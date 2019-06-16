package handler

import (
	// "fmt"
	// "encoding/csv"
    // "encoding/json"
	"os"
	"io"
	"bufio"
    "net/http"
    "github.com/labstack/echo"

)


func (h* Handler) HandleData(c echo.Context) (err error) {
	// TODO: 数据处理逻辑
	// Source
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Destination
	// dst, err := os.Create(file.Filename)
	dst, err := os.Create("school.json")
	if err != nil {
		return err
	}
	defer dst.Close()

	dst.Write([]byte("["))

	// // Copy
	// if _, err = io.Copy(dst, src); err != nil {
	// 	return err
	// }

	br := bufio.NewReader(src)
	bw := bufio.NewWriter(dst)
	cnt := 0
    for {
		if (cnt > 0) {
			bw.WriteString(",\n")
		}
		cnt++
        a, _, c := br.ReadLine()
        if c == io.EOF {
            break
        }
		bw.WriteString(string(a))
		bw.Flush()
	}
	
	dst.Write([]byte("]"))


	return c.String(http.StatusOK, "test")
}