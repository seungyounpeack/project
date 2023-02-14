package kr.go.guri.solution.workList.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

/**
 * 관리자 > 솔루션 워크플로워 리스트 Mapper 클래스
 * @author 권기완
 * @since 2022. 10. 26.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.10.26.   	권기완          최초 생성
 *   
 * </pre>
 */
@Repository("workListMapper")
public class WorkListMapper  extends ComAbstractDAO {

	public List<Map<String, Object>> selectWorkList(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return selectList("WorkListDAO.selectWorkList", param);
	}

	public List<Map<String, Object>> selectCategory() {
		// TODO Auto-generated method stub
		return selectList("WorkListDAO.selectCategory");
	}

}
