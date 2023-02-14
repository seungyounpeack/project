package kr.go.guri.manager.noticeMng.detailNotice.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * 관리자 > 공지 상세 Mapper 클래스
 * @author 권기완
 * @since 2022. 06. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@Repository("detailNoticeMapper")
public class DetailNoticeMapper extends ComAbstractDAO {

	public Map<String, Object> selectDetailList(Map<String, Object> params) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return selectOne("DetailNoticeDAO.selectDetailList", params);
	}

	public Map<String, Object> selectFileInfo(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return selectOne("DetailNoticeDAO.selectFileInfo", params);
	}

	public List<Map<String, Object>> selectFilesInfo(Map<String, Object> params) {
		return selectList("DetailNoticeDAO.selectFilesInfo", params);
	}

	public List<Map<String, Object>> selectDetailInfo(Map<String, Object> params) {
		return selectList("DetailNoticeDAO.selectDetailList", params);
	}

}
